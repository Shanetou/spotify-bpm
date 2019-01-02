import React, { Component } from 'react';

class Stepper extends Component {
  constructor(props) {
    super(props);

    this.state = {
      currentStep: 0,
      totalSteps: React.Children.count(this.props.children) - 1,
    };
  }

  goToPreviousStep = () => {
    this.setState({ currentStep: this.state.currentStep - 1 });
  };

  goToNextStep = () => {
    this.setState({ currentStep: this.state.currentStep + 1 });
  };

  render() {
    const children = React.Children.map(this.props.children, (child, index) => {
      const { currentStep, totalSteps } = this.state;

      return React.cloneElement(child, {
        isActive: index === currentStep,
        displayPrevious: currentStep > 0,
        displayNext: currentStep < totalSteps,
        goToPreviousStep: this.goToPreviousStep,
        goToNextStep: this.goToNextStep,
      });
    });

    return children;
  }
}

export default Stepper