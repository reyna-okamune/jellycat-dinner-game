// ui styling for jellycat card 
import './JellycatCard.css';
// FIXME: add prop types ? 

const JellycatCard = ({name, type, img}) => {

    return (
        <div className="card pop-in">
            <h2 className="jellycat-name">{name}</h2>
            <img src={img} alt={`${name} jellycat`} />
            <p className="jellycat-type">{`${type}`}</p>
        </div>
    );

};

export default JellycatCard;