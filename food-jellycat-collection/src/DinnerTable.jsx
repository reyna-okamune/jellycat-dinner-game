import './DinnerTable.css';  

const DinnerTable = ({selected}) => {

    if (selected.length === 0) {
        return <div className="dinner-table">
            <p>click a jellycat to add !</p>
        </div>;
    }

    return (
        <div className="dinner-table">
            {selected.map((item, index) => (
                <div
                key={index}
                className={`seat circle-${index + 1}`}  // Use seat-{index} class for styling
                >
                {item ? (
                    <>
                    <img src={item.img} alt={item.name} />
                    </>
                ) : (
                    <p className="empty-seat"></p>
                )}
                </div>
            ))}
        </div>
    )

};

export default DinnerTable;