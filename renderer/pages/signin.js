import { useState, useEffect } from 'react';
import { getProviders, useSession, signIn } from 'next-auth/react';

const authProviders = [
  { 
    id: 'google', 
    name: 'Google', 
    color: '#ffffff', 
    textColor: '#757575',
    logo: 'https://www.gstatic.com/images/branding/product/1x/gsa_512dp.png' 
  },
  { 
    id: 'spotify', 
    name: 'Spotify', 
    color: '#1DB954', 
    textColor: '#ffffff',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/1/19/Spotify_logo_without_text.svg' 
  },
];

if (typeof window !== 'undefined' && window.location.protocol !== 'https:' && window.location.protocol !== 'http:') {
  if (window.navigator && !window.navigator.sendBeacon) {
    window.navigator.sendBeacon = () => true;
  } else if (window.navigator) {
    // Overwrite it even if it exists but is throwing errors
    window.navigator.sendBeacon = () => true;
  }
}

export default function SignIn() {
  // const [providers, setProviders] = useState(null);

  // useEffect(() => {
  //   (async () => {
  //     const res = await getProviders();
  //     setProviders(res);
  //   })();
  // }, []);

  return (
<div style={{ 
  display: 'flex', 
  width: 670, height: 752, 
  justifyContent: 'center', 
  alignItems: 'center' 
}}>
  <div style={{
    display: 'flex',
    width: 500, height: 300,
    borderRadius: 20,
    background: 'linear-gradient(135deg, #342d4e, #181524)',
    boxShadow: '0px 0px 20px black',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'flex-start', 
    paddingTop: 40,  
    paddingBottom: 40  
  }}>
    <img style={{ width: 150 }} src='/images/Assets/Klick.png'/>

    {authProviders.map((provider, index) => (
      <div 
        key={provider.id} 
        
        onClick={() => {
  const baseUrl = "https://klick-d6cea.firebaseapp.com/api/auth/signin/google";
  const callbackUrl = encodeURIComponent("https://klick-d6cea.firebaseapp.com/home");
  
  // Construct the direct login URL
  const fullUrl = `${baseUrl}?callbackUrl=${callbackUrl}`;
  
  // This bypasses the NextAuth library entirely and uses Electron's shell directly
  window.open(fullUrl, '_blank');
}}
        style={{
          display: 'flex',
          width: 240, height: 50,
          borderRadius: 12, 
          margin: 10,
          marginTop: index === 0 ? 'auto' : 10, 
          marginBottom: index === authProviders.length - 1 ? 'auto' : 20,
          background: provider.color,
          justifyContent: 'center', 
          alignItems: 'center',
          cursor: 'pointer',
          transition: 'transform 0.1s',
          boxShadow: '0px 4px 10px rgba(0,0,0,0.3)'
        }}
        onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.02)'}
        onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
      >
        <img src={provider.logo} style={{ width: 20, marginRight: 12 }} alt="" />
        <div style={{ color: provider.textColor, fontWeight: '600', fontSize: '15px' }}>
          Sign in with {provider.name}
        </div>
      </div>
    ))}
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
