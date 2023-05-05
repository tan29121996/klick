function HeaderIcon({ Icon }) {
  return (
    <div>
      <Icon style={{ height: 15, color: '#8a8d9f' }}
        onMouseOver={({target})=>target.style.color='white'}
        onMouseOut={({target})=>target.style.color='#8a8d9f'}
      />
    </div>
  )
}

export default HeaderIcon
