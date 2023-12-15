import React, { useState } from 'react'

const Square = ({ value, index, player, onClick, isWinningSquare, disabled }) => {

    // const [tiles, setTiles] = useState(false);

    // const player = value === "playerX" ? "X" : "O";


    const handleClick = () => {
        if (disabled) {
            return
        }
        onClick();
    }

    return (
        <div onClick={handleClick} className='square'>

            {value === 'X' ? (
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 223.32 223.32"
                    className={`animate__animated animate__pulse svg-size  ${isWinningSquare ? 'winning-square' : 'x'}`}
                // width="100"
                // height="100"
                >
                    <defs>

                    </defs>
                    <polygon
                        className="a"
                        points="144.75 111.66 223.32 190.24 190.24 223.32 111.66 144.75 33.09 223.32 0 190.24 78.58 111.66 0 33.09 33.09 0 111.66 78.58 190.24 0 223.32 33.09 144.75 111.66"
                    />
                </svg>
            ) : value === 'O' ? (
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 284.61 284.62"
                    className={`animate__animated animate__pulse svg-size  ${isWinningSquare ? 'winning-square' : 'o'}`}
                // width="100"
                // height="100"
                >
                    <defs>

                    </defs>
                    <path
                        className="a"
                        d="M321.81,105.93a142.31,142.31,0,1,0,142.30,142.31A142.30,142.30,0,0,0,321.81,105.93Zm0,236.78a94.47,94.47,0,1,1,94.47-94.47A94.48,94.48,0,0,1,321.81,342.71Z"
                        transform="translate(-179.5 -105.93)"
                    />
                </svg>
            ) : (
                <p></p>
            )}
        </div>
    )
}

export default Square
