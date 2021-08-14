import { useContext, useState, useEffect } from "react";
import { AuthContext } from "../../../../shared/context/auth-context";
import { User } from '../../../api/configuration/models/users';
import { TableDisplayMode } from "./TableDisplayMode"
import { TableEditMode } from "./TableEditMode"
import { AxiosRequestConfig } from "axios";
import queryString from 'query-string';
import { useHttpClient } from "../../../../shared/hooks/http-hook";
import LoadingSpinner from '../../../../shared/UIElements/LoadingSpinner';
import { useAlert } from 'react-alert';

type IdentityTableProps = {
    isEditMode?: boolean;
    onUpdate?: () => void;
}

const IdentityTable = (props: IdentityTableProps) => {
    const auth = useContext(AuthContext)
    const alert = useAlert()

    const user = auth.user as User;
    const { isEditMode } = props;
    const [errorAge, setErrorMessageAge] = useState("")
    const [errorEmail, setErrorMessageEmail] = useState("")
    const [errorPassword, setErrorMessagePassword] = useState("")
    const { isLoading, error, sendRequest, clearMessages } = useHttpClient();

    useEffect(() => {
        setErrorMessageAge("");
        setErrorMessageEmail("");
        setErrorMessagePassword("");
    }, [isEditMode]);

    const onUpdateUser = async (user: User) => {
        clearMessages();
        const params: AxiosRequestConfig = {
            method: 'PATCH',
            url: `/users/updateUser/${auth.userId}`,
            data: {
                ...user
            },
            headers: {
                Authorization: 'Bearer ' + auth.token
            }
        }

        try {
            const response = await sendRequest(params);
            alert.success('Update Successfuly!')
            auth.logout()
            auth.login(response.data.userId, response.data.token);
        } catch (err) {
            alert.error('Error, please try later')
        }
    }
    return (<>
        <div className="error-msg">{errorEmail}</div>
        <div className="error-msg">{errorAge}</div>
        <div className="error-msg">{errorPassword}</div>
        <div>
            {isLoading && <LoadingSpinner asOverlay />}
            {error && <h5 style={{ color: "red" }}>{error}</h5>}
        </div>
        <table>
            {!isEditMode ?
                <TableDisplayMode user={user} /> :
                <TableEditMode user={user}
                    onErrorEmail={setErrorMessageEmail}
                    onErrorAge={setErrorMessageAge}
                    onErrorPassword={setErrorMessagePassword}
                    onUpdate={onUpdateUser} />}
        </table></>);
};
export default IdentityTable;