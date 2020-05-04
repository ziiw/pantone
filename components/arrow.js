export default props => {
  return (
    <svg 
    width="13"
    height="25"
    viewBox="0 -40 52 100" 
    fill="none" 
    className={props.className}
    xmlns="http://www.w3.org/2000/svg">
      <g transform={`${props.rotate ? `rotate(${props.rotate}, 13, 25)`: ''}`}>
        <path d="M23 2L4 25L23 48" stroke="rgba(255, 255, 255, 1)" strokeWidth="6" />
      </g>
    </svg>
  )
}