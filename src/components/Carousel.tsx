import * as React from 'react';
import ReactResizeDetector from 'react-resize-detector';
import * as classnames from 'classnames';

import { isEqual } from 'lodash';

interface CarouselProps {
    data: any;
    isLoading: boolean;
}

interface CarouselState {
    curSlide: number;
}

const carouselItemWidth = 292;

export default class Carousel extends React.Component<CarouselProps, CarouselState> {
    constructor(props: CarouselProps) {
        super(props);
        
        this.state = {
            curSlide: 0
        }
    }
    
    componentWillReceiveProps(nextProps: CarouselProps) {
        if (!isEqual(this.props, nextProps)) {
            this.setState({
                curSlide: 0
            })
        }
    }
    
    public render () {
        return (
            <div className="demo-carousel">
                <div className="demo-carousel__h4">Popular around you</div>
                <div className="demo-carousel__main">
                    <ReactResizeDetector handleWidth handleHeight onResize={this.onResize}>
                        {!this.props.isLoading ? this.renderCarouselSlide() : 'Loading..'}
                    </ReactResizeDetector>
                    {this.renderCarouselNavLeft()}
                    {this.renderCarouselNavRight()}
                    
                </div>
            </div>
        );
    }
    
    private onResize = (width: number, height: number) => {
        console.log('Hey', width, height);
        this.setState({
            curSlide: 0
        })
    }
    
    private renderCarouselNavLeft() {
        const style = classnames({
            'demo-carousel__button': true,
            'demo-carousel__button--left': true,
            'demo-carousel__button--show': Math.abs(this.state.curSlide) > 0
        });
                
        return (
            <div className={style} onClick={() => this.handleCarouselClick('next')}>
                <span className="fas fa-angle-left" />
            </div>
        )
    }
    
    private renderCarouselNavRight() {
        const style = classnames({
            'demo-carousel__button': true,
            'demo-carousel__button--right': true,
            'demo-carousel__button--show': Math.abs(this.state.curSlide) < this.props.data.length - 1
        });
        
        return (
            <div className={style} onClick={() => this.handleCarouselClick('prev')}>
                <span className="fas fa-angle-right" />
            </div>
        )
    }
    
    private renderCarouselSlide() {
        const style = {
            "marginLeft": this.state.curSlide * carouselItemWidth
        };
        
        return (
            <div className="demo-carousel__main-slider" style={style}>
                {this.props.data.length > 0 ? this.renderCard() : this.renderEmpty()}
            </div>
        )
    }
    
    private handleCarouselClick = (type: string) => {
        const curSlide = (type === 'next') ? this.state.curSlide + 1 : this.state.curSlide - 1;
        const numTotal = this.props.data.length;
        const maxRight = 0 - (numTotal - 1);
        
        const limitCurSlide = (curSlide: number) => {
            if (curSlide >= 0) {
                return 0;
            } else if (curSlide <= maxRight) {
                return maxRight;
            } else {
                return curSlide;
            }
        }        
        
        this.setState({
            curSlide: limitCurSlide(curSlide)
        });        
    }
    
    private renderCard(): JSX.Element[] {
        return this.props.data.map((item: any) => {
            return (
                <div className="demo-carousel__item">
                    <div className="demo-carousel__item-wrapper">
                        <img className="demo-carousel__item-img" src={item.img} />
                        <div className="demo-carousel__item-img-footer">
                            <div className="demo-carousel__item-img-footer-title">{item.title}</div>
                            <div className="demo-carousel__item-img-footer-location"><span className="fas fa-map-marker-alt"/> {item.location}</div>
                        </div>
                    </div>
                </div>
            );
        })
    }
    
    private renderEmpty(): JSX.Element {
        return (
            <div className="demo-carousel__item">
                <div className="demo-carousel__item-wrapper">
                    No results
                </div>
            </div>
        );
    }
}
