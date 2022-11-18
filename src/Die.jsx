function Die(props) {
  const styles = {
    backgroundColor: props.die.isHeld ? "#59E391" : "white",
  };
  return (
    <div
      className='die'
      style={styles}
      onClick={props.holdDice}
    >
      {props.die.value}
    </div>
  );
}

export default Die;
