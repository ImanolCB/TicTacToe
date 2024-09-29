
export const Square = ({children, isSelected, updateBoard, index}) => {

    const className = `square ${isSelected ? 'is-selected' : ''} `

    const HandleClick = () => {
      updateBoard(index)
    }

    return(
      <div onClick={HandleClick} className={className}>
        {children}
      </div>
    )
  }