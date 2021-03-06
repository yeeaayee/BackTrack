import React from 'react';
import axios from 'axios';

import { Modal, Form, Input, InputNumber, message } from 'antd';

class AddPBIForm extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      title: "",
      detail: "",
      story_point: 0,
    }
  }

  handleTitleInput = (e) => {
    this.setState({ title: e.target.value })
  }

  handleDetailInput = (e) => {
    this.setState({ detail: e.target.value })
  }

  handleStoryPointInput = (v) => {
    this.setState({ story_point: v })
  }

  postNewPBI = () => {
    axios.post("http://127.0.0.1:8000/product/api/create/", {
      title: this.state.title,
      detail: this.state.detail,
      story_point: this.state.story_point,
      projectId: this.props.projectId
    })
      .then(res => {
        message.success("New PBI created!", 3)
        this.setState({
          title: "",
          detail: "",
          story_point: 0,
        })
        this.props.refresh()
      })
      .catch(err => {
        console.log(err)
      })
  }

  handleSubmit = () => {
  // check input length of title and description
  if (this.state.title.length > 70) {
    message.error("PBI title should be no more than 70 characters.")
    return;
  }
    
  if (this.state.detail.length > 500) {
    message.error("PBI detail should be no more than 500 characters.")
    return;
  }
    this.postNewPBI()
    this.props.close()
  }

  render() {
    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 8 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 16 },
      },
    };

    return (<div>
      <Modal
        title="Add PBI"
        visible={this.props.visible}
        onOk={this.handleSubmit}
        onCancel={this.props.close}
      >
        <Form {...formItemLayout}>
          <Form.Item label="Title">
            <Input value={this.state.title} onChange={this.handleTitleInput} placeholder="Enter title" />
          </Form.Item>
          <Form.Item label="Story Points">
            <InputNumber value={this.state.story_point} onChange={this.handleStoryPointInput} defaultValue={0} min={0} />
          </Form.Item>
          <Form.Item label="Status">
            <Input value="To Do" disabled />
          </Form.Item>
          <Form.Item label="Details">
            <Input.TextArea value={this.state.detail} rows={4} onChange={this.handleDetailInput} placeholder="Enter detail" />
          </Form.Item>
        </Form>
      </Modal>
    </div>)
  }
}

export default AddPBIForm;
