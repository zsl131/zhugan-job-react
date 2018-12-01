import React from 'react';
import {Modal} from 'antd';
import {Player} from 'video-react';
import "video-react/dist/video-react.css"; // import css

export default class PlayVideoModal extends React.Component {

    state = {
        videoList: 0,
        pptList: 0,
        learnList: 0,
    }

    render() {
        // console.log(this.props.video);
        return(
            <Modal {...this.props} style={{ "minWidth": '85%', top: 20 , "padding":"0px"}}>
                <Player>
                    <source src={this.props.url} />
                </Player>
            </Modal>
        );
    }
}
