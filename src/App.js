import React, {Component} from 'react';
import styles from './style.module.css';
import dummyImage from '../assets/dummyImage.jpg';
import Modal from './components/Modal';
import AddImage from './components/AddImage';
import FolderWrapper from './components/FolderWrapper';
import {connect} from 'react-redux';
import {addItem, removeItem} from './store/gallery/actions';
import buildTree from './utils/buildTree';

class App extends Component{

    state = {
        modalVisible: false,
        clickedParentId: null,
        activeImage: {
            title: '',
            url: null
        }
    };

    showModal = () => {
        this.setState({modalVisible: true})
    };

    hideModal = () => {
        this.setState({modalVisible: false})
    };

    toggleAddImage = (id) => {
        this.setState({clickedParentId: id}, () => this.showModal())
    };

    setActiveImage = (title, image) => {
        this.setState({
            ...this.state,
            activeImage: {
                ...this.state.activeImage,
                title: title,
                url: image
            }
        })
    }

    render() {
        const dataset = buildTree(this.props.gallery);
        return (
            <div>
                {this.state.modalVisible ?
                    <Modal>
                        <AddImage
                            hideModal={this.hideModal}
                            addItem={this.props.addItem}
                            parentId={this.state.clickedParentId}
                        />
                    </Modal>
                    : null
                }
                <div className={styles.container}>
                    {this.state.activeImage.url ?
                        <img src={this.state.activeImage.url}/> :
                        <img src={dummyImage}/>
                    }
                    <FolderWrapper
                        data={dataset}
                        setActiveImage={(title, image) => this.setActiveImage(title, image)}
                        addItem={this.props.addItem}
                        removeItem={this.props.removeItem}
                        addImage={(id) => this.toggleAddImage(id)}
                    />
                </div>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        gallery: state.gallery.items
    };
}

const mapDispatchToProps = {
    addItem,
    removeItem
};


export default connect(mapStateToProps, mapDispatchToProps)(App);
