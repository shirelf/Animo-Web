
import { useState } from 'react';
// @ts-ignore
import { sendMessage, isTyping } from 'react-chat-engine';
import { SendOutlined, PictureOutlined } from '@ant-design/icons';
import './Chat.css';

const MessageForm = (props:any) => {
  const [value, setValue] = useState('');
  const { chatId, creds } = props;
  const handleSubmit = (event: any) => {
    event.preventDefault();
    const text = value.trim();
    if (text.length > 0) {
      sendMessage(creds, chatId, { text });
    }

    setValue('');
  };

  const handleChange = (event: any) => {
    setValue(event.target.value);
    isTyping(props, chatId);
  };

  const handleUpload = (event:any) => {
    console.log('TRY UPLOADIGN');
    sendMessage(creds, chatId, { files: event.target.files, text: '' });
  };
  return (<form className="message-form" onSubmit={handleSubmit}>
    <input
      className="message-input"
      placeholder="Send a message ..."
      value={value}
      onChange={handleChange}
      onSubmit={handleSubmit}
    />
    <label htmlFor='upload-button'>
      <span className='image-button'>
        <PictureOutlined className="picture-icon" />
      </span>
    </label>
    <input
      type="file"
      multiple={false}
      id='upload-button'
      style={{ display: 'none' }}
      onChange={handleUpload}
    />
    <button type="submit" className='send-button'>
      <SendOutlined className="send-icons"/>
    </button>
  </form>);
};
export default MessageForm;
