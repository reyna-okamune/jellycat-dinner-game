const JellycatCard = ({name, type, img, value}) => {

    return (
        <div className="card">
            <h2 className="jellycat-name">{name}</h2>
            <img src={img} alt={`${name} jellycat`} />
            <p className="jellycat-type">{`${type} - ${value}`}</p>
        </div>
    );

};

export default JellycatCard;