const ChatList = () => {
  return (
    <div className="container-body">
      <div className="tab">
        <input type="checkbox" id="cb1" />
        <div className="section-title">
          <label htmlFor="cb1" className="tab-label">
            My chats (2)
          </label>
        </div>
        <div className="tab-content">
          <div className="section-content">
            <div className="section-column">
              <div className="chat-item">
                <div className="chat-item-avatar avatar-4">TC</div>
                <div className="chat-item-content">
                  <p className="chat-item-title">Tina Cornell</p>
                  <p className="chat-item-text">The test message</p>
                </div>
                <div className="chat-item-info">
                  <span className="chat-item-time">15s</span>
                </div>
              </div>
              <div className="chat-item">
                <div className="chat-item-avatar avatar-7">CA</div>
                <div className="chat-item-content">
                  <p className="chat-item-title">Collete Aicart</p>
                  <p className="chat-item-text">Long messages should end with ellipses.</p>
                </div>
                <div className="chat-item-info">
                  <span className="chat-item-time">35m</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatList;
