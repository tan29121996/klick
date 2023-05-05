import { useState, useEffect } from 'react';
import { getProviders, useSession, signIn } from 'next-auth/react';

export default function SignIn() {
  const [providers, setProviders] = useState(null);

  useEffect(() => {
    (async () => {
      const res = await getProviders();
      setProviders(res);
    })();
  }, []);

  return (
    <div style={{ display: 'flex', width: 670, height: 752, justifyContent: 'center', alignItems: 'center' }}>
      <div style={{
        display: 'flex',
        width: 500, height: 550,
        borderRadius: 20,
        background: 'linear-gradient(135deg, #342d4e, #181524)',
        boxShadow: '0px 0px 20px black',
        flexDirection: 'column',
        justifyContent: 'center', alignItems: 'center' }}
      >
        <img style={{ width: 150 }} src='/images/Assets/Klick.png'/>
        {providers &&
          Object.values(providers).map((provider) => (
            <div key={provider.name}>
              <div id='click' style={{
                display: 'flex',
                width: 140, height: 50,
                borderRadius: 15, margin: 15,
                background: 'linear-gradient(135deg, #ca47af, #c77ee1)',
                justifyContent: 'center', alignItems: 'center' }}
                onClick={() => signIn(provider.id)}
              >
                <div style={{ color: 'white' }}>
                  Authenticate
                </div>
              </div>
            </div>
          )
        )}
      </div>
    </div>
  );
}

export async function getInitialProps() {
  const providers = await getProviders();
  return {
    props: { providers },
  };
}
