import * as React from 'react';

export interface ITestChildComponentProps {
	description: string;
}

export interface ITestChildComponentState {}

export default class TestChildComponent extends React.Component<ITestChildComponentProps, ITestChildComponentState> {

  constructor(props: ITestChildComponentProps) {
	super(props);

	this.state = {
	  
	};
  }

  public render(): React.ReactElement<ITestChildComponentProps> {
	return (
	  <div>
		<p>Some footer idk</p>
	  </div>
	);
  }
}
