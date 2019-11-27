import React from "react";
import axios from "axios";
import { Context } from "../../context/ContextSource";

import { Modal, Tag, Button, message, Tooltip } from "antd";

class ViewTask extends React.Component {

  static contextType = Context;

  constructor(props) {
    super(props);
    this.task = this.props.task;
    this.state = { visible: false };
    if (this.task.status === "In Progress") this.disableButton = false;
    else this.disableButton = true;
  }

  viewDetail = e => {
    console.log(e);
    this.setState({
      visible: true
    });
  };

  handleOk = e => {
    console.log(e);
    this.setState({
      visible: false
    });
  };

  handleCancel = e => {
    console.log(e);
    this.setState({
      visible: false
    });
  };

  changeStatus = e => {
    axios
      .post("http://127.0.0.1:8000/sprint/api/edit/", {
        pbi: this.task.pbi,
        id: this.task.id,
        name: this.task.name,
        status: "Done",
        description: this.task.description,
        estimated_time: this.task.estimated_time,
        pic: this.task.pic
      })
      .then(res => {
        message.success("Task Finished!", 3);
        this.setState({
          visible: false
        });
        this.props.refresh();
      })
      .catch(err => {
        alert("Wrong");
        console.log(err);
      });
  };

  render() {
    var FinishButton;
    if (this.disableButton) {
      FinishButton = <Button icon="check-circle" disabled />;
    } else {
      FinishButton = (
        <Tooltip title="Finish Task">
          <Button
            disabled={this.context.user.role === "Scrum Master" }
            icon="check-circle"
            onClick={this.changeStatus}
          />
        </Tooltip>
      );
    }

    return (
      <div>
        <Tag
          color="blue"
          onClick={this.viewDetail}
          style={{ fontSize: "18px", margin: "5px" }}
        >
          {this.task.name}
        </Tag>
        {FinishButton}
        <Modal
          title="View Task"
          visible={this.state.visible}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
        >
          <p>Task Name: {this.task.name}</p>
          <p>Description: {this.task.description}</p>
          <p>Status: {this.task.status}</p>
          <p>Estimated Time: {this.task.estimated_time}</p>
          <p>Person In Charge: {this.task.pic}</p>
        </Modal>
      </div>
    );
  }
}

export default ViewTask;
