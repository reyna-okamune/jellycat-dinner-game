const JellycatCard = ({name, type, img}) => {

    return (
        <div className="card">
            <h2 className="jellycat-name">{name}</h2>
            <img src={img} alt={`${name} jellycat`} />
            <p className="jellycat-type">{`${type}`}</p>
        </div>
    );

};

export default JellycatCard;