import * as React from 'react';

interface InputSearchProps {
    onChange: (text: string) => void;
}

interface InputSearchState {}

export default class InputSearch extends React.Component<InputSearchProps, InputSearchState> {
    constructor(props: InputSearchProps) {
        super(props);
    }
    
    public render () {
        return (
            <fieldset className="input-search">
                <input 
                    type="text" 
                    name="search-box" 
                    placeholder="Search for..."
                    onChange={this.handleOnChange}
                />
            </fieldset>
        );
    }
    
    private handleOnChange = (event: any) => {
        const value = event.target.value;
        
        this.props.onChange(value);
    }
}
