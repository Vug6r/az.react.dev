class Timer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {seconds: 0};
  }

  tick() {
    this.setState(state => ({
      seconds: state.seconds + 1,
    }));
  }

  componentDidMount() {
    this.interval = setInterval(() => this.tick(), 1000);
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  render() {
    return <div>{this.state.seconds} saniyə</div>;
  }
}

<<<<<<< HEAD
ReactDOM.render(<Timer />, document.getElementById('timer-example'));
=======
root.render(<Timer />);
>>>>>>> c1c3d1db304adfa5446accb0312e60d515188414
