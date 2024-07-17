function Message() {
    const name = 'Enock';
    let mess = <h1>Hello {name}</h1>
    if (name)
        return mess;
    return 'Hello World!'
};

export default Message;