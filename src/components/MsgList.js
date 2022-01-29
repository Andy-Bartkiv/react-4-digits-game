
const MsgList = ({ msgArr }) => {

    const msgCls = (author) => 'chat-msg-text' + ((author==='Me') ? ' my' : ' opp');

    return (
        <div className="chat-msg-list">
            { msgArr.map( msg => 
                <span key={ msg.id } className={ msgCls(msg.author) }>
                    { msg.text }
                </span>    
            )}
        </div>
    )
}

export default MsgList
