

const Container = ({ children, size = 'xl' }) => {
  return (
    <div
      className={`${
        size === 'xl' ? 'max-w-screen-xl' : 'max-w-screen-lg'
      } mx-auto`}
    >
      {children}
    </div>
  )
}

export default Container