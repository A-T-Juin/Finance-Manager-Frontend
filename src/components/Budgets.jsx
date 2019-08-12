import React, { Component } from "react";
import { connect } from "react-redux";
import { VictoryContainer, VictoryLabel, VictoryPie } from "victory";
import {
  Button,
  Form,
  FormGroup,
  Label,
  Modal,
  ModalHeader,
  ModalFooter,
  ModalBody,
  InputGroup,
  InputGroupAddon,
  Input,
  Table } from "reactstrap";
import {
  budgetSelector,
  budgetAmountSelector,
  createBudget,
  editBudget,
  deleteBudget
} from "../actions/BudgetActions";
import ShowReceipt from "./ShowReceipt";
import pieChartPrep from "./utils/PieChartPrep";

class Budgets extends Component {
  constructor(){
    super();
    this.state = {
      title: "",
      description: "",
      index: null,
      startDate: "",
      endDate: "",
      budgetGoal: 0,
      modal: false,
      createModal: false,
      deleteModal: false,
      editModal: false
    }
  }

  closeModals(){
    this.setState({
      modal: false,
      createModal: false,
      deleteModal: false,
      editModal: false
    })
  }

  deleteBudget(index){
    this.props.deleteBudget(this.props.userData.id, index);
    this.closeModals()
  }
  onEditClick(index){
    const editInstance = this.props.budgets.find(instance => instance.id === index)
    this.setState({
      index,
      title: editInstance.title,
      description: editInstance.description,
      startDate: editInstance.startDate,
      endDate: editInstance.endDate,
      budgetGoal: editInstance.budgetGoal
    })
    this.toggleModal();
  }

  onShowReceiptClick(index){
    this.props.budgetSelector(index);
    this.props.budgetAmountSelector(this.props.userData.id, index);
    this.closeModals();
  }

  prepModal(budget){
    this.setState({
      title: budget.datum.title,
      description: budget.datum.description,
      index: budget.datum.id,
      startDate: budget.datum.startDate,
      endDate: budget.datum.endDate,
      budgetGoal: budget.datum.budgetGoal
    })
  }

  toggleModal(){
    this.setState({
      modal: !this.state.modal
    });
  }

  toggleCreateModal(){
    this.setState({
      createModal: !this.state.createModal
    });
  }

  toggleDeleteModal(){
    this.setState({
      deleteModal: !this.state.deleteModal
    });
  }

  toggleEditModal(){
    this.setState({
      editModal: !this.state.editModal
    });
  }

  createModal(){
    this.resetForm();
    this.toggleCreateModal();
  }

  onSubmit(e){
    const newBudget = {
      title: this.state.title,
      description: this.state.description,
      startDate: this.state.startDate,
      endDate: this.state.endDate,
      budgetGoal: this.state.budgetGoal
    }

    if (this.state.index) {
      this.props.editBudget(newBudget, this.props.userData.id, this.state.index)
    } else {
      this.props.createBudget(newBudget, this.props.userData.id)
    }

    e.preventDefault();
    this.resetForm();
    this.closeModals();
  }
  onChange(e){
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  resetForm(){
    this.setState({
      title: "",
      description: "",
      index: null,
      startDate: "",
      endDate: "",
      budgetGoal: 0
    })
  }

  render(){
    const pieBudgetData = pieChartPrep(this.props.budgets);
    const budgetItems = this.props.budgets.map(budget =>
      <tr key={budget.id}>
        <td>{budget.title}</td>
        <td>{budget.startDate} - {budget.endDate}</td>
        <td>{budget.budgetGoal}</td>
        <td><Button color="primary" onClick={(e) => this.onEditClick(budget.id)}>Edit</Button></td>
        <td><Button color="danger" onClick={(e) => this.onDeleteClick(budget.id)}>Delete</Button></td>
        <td><Button color="secondary" onClick={(e) => this.onShowReceiptClick(budget.id)}>Show Receipts</Button></td>
      </tr>
    )

    return(
      <div>
        <Button outline block color="success" onClick={(e) => this.createModal()}>Create New Budget</Button>
        <VictoryPie
          data={pieBudgetData}
          x="title"
          y="pieData"
          labels="title"
          colorScale="qualitative"
          containerComponent={
            <VictoryContainer
              height={250}
            />
          }
          innerRadius={200}
          startAngle={-90}
          endAngle={90}
          events={[{
            target: "data",
            eventHandlers: {
              onClick: () => {
                return [
                  {
                    target:"data",
                    mutation: (props) => {
                      this.prepModal(props);
                      this.toggleModal();
                    }
                  }
                ]
              }
            }
          }]}
        >
        </VictoryPie>
        <Modal isOpen={this.state.modal} toggle={(e) => this.toggleModal()}>
          <ModalHeader toggle={(e) => this.toggleModal()}>{this.state.title}</ModalHeader>
          <ModalBody>
            <div>
              <h4>Description</h4>
              <p>{this.state.description}</p>
            </div>
            <hr />
            <div>
              <h4>Start Date</h4>
              <p>{this.state.startDate} - {this.state.endDate}</p>
            </div>
            <hr />
            <div>
              <h4>budgetGoal</h4>
              <p>{this.state.budgetGoal}$</p>
            </div>
          </ModalBody>
          <ModalFooter>
            <Button color="info" onClick = {(e) => this.onShowReceiptClick(this.state.index)}>Show Receipts</Button>
            <Button color="secondary" onClick={(e) => this.toggleEditModal()}>Edit</Button>
            <Button color="danger" onClick={(e) => this.toggleDeleteModal()}>Delete</Button>
          </ModalFooter>
        </Modal>
        <Modal isOpen={this.state.createModal} toggle={(e) => this.toggleCreateModal()}>
          <ModalHeader toggle={(e) => this.toggleCreateModal()}>Budget</ModalHeader>
          <ModalBody>
            <Form onSubmit={(e) => this.onSubmit(e)}>
              <FormGroup>
                <div>
                  <Label>Title</Label>
                </div>
                <InputGroup>
                  <Input
                    type="text"
                    name="title"
                    value={this.state.title}
                    onChange={(e) => this.onChange(e)}
                  />
                </InputGroup>
              </FormGroup>
              <FormGroup>
                <div>
                  <Label>Description</Label>
                </div>
                <InputGroup>
                  <Input
                    type="text"
                    name="description"
                    value={this.state.description}
                    onChange={(e) => this.onChange(e)}
                  />
                </InputGroup>
              </FormGroup>
              <FormGroup>
                <div>
                  <Label>Start Date</Label>
                </div>
                <InputGroup>
                  <Input
                    type="date"
                    name="startDate"
                    value={this.state.startDate}
                    onChange={(e) => this.onChange(e)}
                  />
                </InputGroup>
              </FormGroup>
              <FormGroup>
                <div>
                  <Label>End Date</Label>
                </div>
                <InputGroup>
                  <Input
                    type="Date"
                    name="endDate"
                    value={this.state.endDate}
                    onChange={(e) => this.onChange(e)}
                  />
                </InputGroup>
              </FormGroup>
              <FormGroup>
                <div>
                  <Label>Budget Goal</Label>
                </div>
                <InputGroup>
                  <Input
                    type="number"
                    name="budgetGoal"
                    value={this.state.budgetGoal}
                    onChange={(e) => this.onChange(e)}
                  />
                  <InputGroupAddon addonType="append">$</InputGroupAddon>
                </InputGroup>
              </FormGroup>
              <ModalFooter>
                <Button color="success" type="submit">Submit!</Button>
              </ModalFooter>
            </Form>
          </ModalBody>
        </Modal>
        <Modal isOpen={this.state.deleteModal} toggle={(e) => this.toggleDeleteModal()}>
          <ModalHeader toggle={(e) => this.toggleDeleteModal()}>
            <h2>Delete!</h2>
          </ModalHeader>
          <ModalBody>
            <p>
              Are you sure you want to delete this budget period?
            </p>
          </ModalBody>
          <ModalFooter>
            <Button color="danger" onClick={(e) => this.deleteBudget(this.state.index)}>Confirm Delete</Button>
          </ModalFooter>
        </Modal>

        <Modal isOpen={this.state.editModal} toggle={(e) => this.toggleEditModal()}>
          <ModalHeader toggle={(e) => this.toggleEditModal()}>
            <h2>Edit Budget Period</h2>
          </ModalHeader>
          <ModalBody>
            <Form onSubmit={(e) => this.onSubmit(e)}>
              <FormGroup>
                <div>
                  <Label>Title</Label>
                </div>
                <InputGroup>
                  <Input
                    type="text"
                    name="title"
                    value={this.state.title}
                    onChange={(e) => this.onChange(e)}
                  />
                </InputGroup>
              </FormGroup>
              <FormGroup>
                <div>
                  <Label>Description</Label>
                </div>
                <InputGroup>
                  <Input
                    type="text"
                    name="description"
                    value={this.state.description}
                    onChange={(e) => this.onChange(e)}
                  />
                </InputGroup>
              </FormGroup>
              <FormGroup>
                <div>
                  <Label>Start Date</Label>
                </div>
                <InputGroup>
                  <Input
                    type="date"
                    name="startDate"
                    value={this.state.startDate}
                    onChange={(e) => this.onChange(e)}
                  />
                </InputGroup>
              </FormGroup>
              <FormGroup>
                <div>
                  <Label>End Date</Label>
                </div>
                <InputGroup>
                  <Input
                    type="Date"
                    name="endDate"
                    value={this.state.endDate}
                    onChange={(e) => this.onChange(e)}
                  />
                </InputGroup>
              </FormGroup>
              <FormGroup>
                <div>
                  <Label>Budget Goal</Label>
                </div>
                <InputGroup>
                  <Input
                    type="number"
                    name="budgetGoal"
                    value={this.state.budgetGoal}
                    onChange={(e) => this.onChange(e)}
                  />
                  <InputGroupAddon addonType="append">$</InputGroupAddon>
                </InputGroup>
              </FormGroup>
              <ModalFooter>
                <Button color="success" type="submit">Confirm Edit</Button>
              </ModalFooter>
            </Form>
          </ModalBody>
        </Modal>
      <ShowReceipt budgetID={this.props.budgetSelected} />
    </div>
    )
  }
}

const mapStateToProps = state => ({
  userData: state.User.userInfo,
  budgets: state.Budget.listOfBudgets,
  budgetSelected: state.Budget.selectedBudget,
})

export default connect(mapStateToProps, {
  budgetSelector,
  budgetAmountSelector,
  createBudget,
  editBudget,
  deleteBudget,
})(Budgets);
