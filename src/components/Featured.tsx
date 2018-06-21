import * as React from 'react';

interface FeaturedProps {
    data: any;
    isLoading: boolean;
}

interface FeaturedState {}

export default class Featured extends React.Component<FeaturedProps, FeaturedState> {
    constructor(props: FeaturedProps) {
        super(props);
    }
    
    public render () {        
        return (
            <div className="demo-featured">
                <div className="demo-featured__h4">Featured</div>
                <div className="demo-featured__main">
                    {!this.props.isLoading ? this.renderItemList() : 'Loading..'}
                </div>
            </div>
        );
    }
    
    private renderItemList(): JSX.Element[] {
        return this.props.data.map((item: any) => (
                <div className="demo-featured__item">
                    <div className="demo-featured__item-wrapper">
                        <img className="demo-featured__item-img" src={item.img} />
                        <div className="demo-featured__item-img-footer">
                            <div className="demo-featured__item-img-footer-title">{item.title}</div>
                            <div className="demo-featured__item-img-footer-location"><span className="fas fa-map-marker-alt"/> {item.location}</div>
                        </div>
                    </div>
                </div>
            ));
    }
    
    
}
