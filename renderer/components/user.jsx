import { faker } from '@faker-js/faker';

function User({ session }) {
  return (
    <div style={{ position: 'relative'}}>
      <div style={{ display: 'flex',  flexDirection: 'column', justifyContent:'center', alignItems:'center', position: 'relative', top: 45 }}>
        <img
          src='/images/Assets/Polygon.png'
          style={{ position: 'absolute', top: -54 }}
          width={210}
          height={210}
        />
        <div id='click' style={{
          width: 97, height: 97,
          border: '3px solid #8e52e3',
          borderRadius: 97,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center' }}
        >
          <img style={{ width: 90, height: 90, borderRadius: 90, background: 'white' }}
            src={session?.user?.image}
          />
        </div>
        <text style={{ fontSize: 16, marginTop: 30, color: 'white'}}>{session?.user?.name}</text>
        <text style={{ fontSize: 14, marginTop: 0, color: '#999bac'}}>{'@'}{session?.user?.email.split('@')[0]}</text>
      </div>
    </div>
  );
};
export default User;
