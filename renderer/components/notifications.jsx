function Notifications({ fullName, avatarUrl }) {
  return (
    <div style={{
      display: 'flex',
      flexDirection: 'row',
      position: 'relative',
      top: 80,
      marginBottom: 12,
      marginLeft: 12,
      marginRight: 12,
      height: 62,
      borderRadius: 10,
      backgroundColor: '#393d5b' }}
    >
      <div style={{ marginTop: 14, marginLeft: 12, marginRight: 9 }}>
        <div style={{
          width: 32, height: 32,
          border: '2px solid #9254ea',
          borderRadius: 14,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center' }}
        >
          <img style={{ width: 26, height: 26, borderRadius: 8 }}
            src={avatarUrl}
          />
        </div>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', width: 150, marginRight: 5  }}>
        <div style={{ position: 'relative', top: 8, width: 130, fontSize: 12, color: 'white'}}>{fullName}{' requested to be your friend'}</div>
        <div style={{ position: 'relative', marginTop: 10, fontSize: 10, color: '#999bac'}}>5 min ago</div>
      </div>
    </div>
  );
};
export default Notifications;
