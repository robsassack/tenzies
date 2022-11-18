function Die(props) {
  const styles = {
    backgroundColor: props.die.isHeld ? "#59E391" : "white",
  };

  let pips;
  switch (props.die.value) {
    case 1:
      pips = <div className='pip' style={{ gridArea: "g" }}></div>;
      break;
    case 2:
      pips = (
        <>
          <span className='pip' style={{ gridArea: "a" }}></span>
          <span className='pip' style={{ gridArea: "b" }}></span>
        </>
      );
      break;
    case 3:
      pips = (
        <>
          <span className='pip' style={{ gridArea: "a" }}></span>
          <span className='pip' style={{ gridArea: "g" }}></span>
          <span className='pip' style={{ gridArea: "b" }}></span>
        </>
      );
      break;
    case 4:
      pips = (
        <>
          <span className='pip' style={{ gridArea: "a" }}></span>
          <span className='pip' style={{ gridArea: "c" }}></span>
          <span className='pip' style={{ gridArea: "d" }}></span>
          <span className='pip' style={{ gridArea: "b" }}></span>
        </>
      );
      break;
    case 5:
      pips = (
        <>
          <span className='pip' style={{ gridArea: "a" }}></span>
          <span className='pip' style={{ gridArea: "c" }}></span>
          <span className='pip' style={{ gridArea: "g" }}></span>
          <span className='pip' style={{ gridArea: "d" }}></span>
          <span className='pip' style={{ gridArea: "b" }}></span>
        </>
      );
      break;
    case 6:
      pips = (
        <>
          <span className='pip' style={{ gridArea: "a" }}></span>
          <span className='pip' style={{ gridArea: "c" }}></span>
          <span className='pip' style={{ gridArea: "e" }}></span>
          <span className='pip' style={{ gridArea: "f" }}></span>
          <span className='pip' style={{ gridArea: "d" }}></span>
          <span className='pip' style={{ gridArea: "b" }}></span>
        </>
      );
      break;
  }

  return (
    <div className='die' style={styles} onClick={props.holdDice}>
      {pips}
    </div>
  );
}

export default Die;
