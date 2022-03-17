import { withNavigation } from "react-navigation";
import { Component } from "react";

export class PageTransitionOrg extends Component {

    didFocusListener = null;

    render() {
        return null;
    }

    componentDidUpdate() {
        if (!this.onLoadTriggered) {
            this.onLoadTriggered = true;
            this.didFocusListener = this.props.navigation.addListener('willFocus', this.didFocus.bind(this));
            if (this.props.didFocus) {
                this.setPageDetails(this.props.navigation.state);
                this.props.didFocus.execute();
            }

        }
    }

    didFocus(evt) {
        if (this.props.didFocus) {
            this.setPageDetails(evt.state);
            this.props.didFocus.execute();
        }
    }

    setPageDetails(state) {
        if (state.params && state.params.pageName) {
            this.props.pageName.setValue(state.params.pageName);
        } else {
            this.props.pageName.setValue(null);
        }
        if (state.params && state.params.title) {
            this.props.pageTitle.setValue(state.params.title);
        } else {
            this.props.pageTitle.setValue(null);
        }
    }

    componentWillUnmount() {
        this.didFocusListener.remove();
    }
}

// @ts-ignore
const PageTransition = withNavigation(PageTransitionOrg);
export { PageTransition };
