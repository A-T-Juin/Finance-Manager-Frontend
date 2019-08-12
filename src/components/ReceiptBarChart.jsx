import React, { Component } from "react";
import { connect } from "react-redux";
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Form,
  FormGroup,
  Label,
  Input,
  InputGroup,
  InputGroupAddon,
  Row,
  Col,
} from "reactstrap";
import {
  VictoryAxis,
  VictoryVoronoiContainer,
  VictoryChart,
  VictoryBar,
  VictoryStack,
  VictoryLabel
} from "victory";
import {
  numMostReceiptsInCategory,
  sortReceiptToCategory,
  layeredBarChartData,
  toFinalArray,
} from "./utils/LayeredBarChartData";
import receiptFormatter from "./utils/ReceiptFormatter";
import {
  editReceipt,
  deleteReceipt
} from "../actions/ReceiptActions";
import BarChartDescriptor from "./BarChartDescriptor";
import receiptDescriptionChecker from "./utils/ReceiptDescriptionChecker";
import numStringConverter from "./utils/NumStringConverter";
import toFinalBarChartArray from "./utils/FinalBarChartData";

class ReceiptBarChart extends Component {
  constructor(){
    super();
    this.state = {
      receiptName: "",
      receiptAmount: "",
      receiptCategory: "",
      receiptDate: "",
      receiptDescription: "",
      index: null,
      modal: false,
      nestedEditModal: false,
      nestedDeleteModal: false,
      receiptBarColor: "",
    }
  }

  onChange(e){
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  receiptStyleHolder(receiptData){
    this.setState({
      receiptBarColor: receiptData.style.fill
    })
  }

  resetForm(){
    this.setState({
      receiptName: "",
      receiptAmount: "",
      receiptCategory: "",
      receiptDate: "",
      receiptDescription: "",
      index: null
    });
  }

  toggleModal(){
    this.setState({
      modal: !this.state.modal
    });
  }

  toggleNestedEditModal(){
    this.setState({
      nestedEditModal: !this.state.nestedEditModal
    });
  }

  toggleNestedDeleteModal(){
    this.setState({
      nestedDeleteModal: !this.state.nesteddDeleteModal
    });
  }

  submitEditedReceipt(e){
    const editedReceipt = {
      receiptAmount: this.state.receiptAmount,
      receiptCategory: this.state.receiptCategory,
      receiptDate: this.state.receiptDate,
      receiptDescription: this.state.receiptDescription,
      receiptName: this.state.receiptName
    };

    if (this.state.index){
      this.props.editReceipt(editedReceipt, this.props.userData.id, this.props.budgetSelected, this.state.index);
    }
    e.preventDefault();
    this.resetForm();
    this.toggleNestedEditModal();
    this.toggleModal();
  }

  handleReceiptDelete(index){
    this.props.deleteReceipt(this.props.userData.id, this.props.budgetSelected, index);
    this.resetForm();
    this.toggleNestedDeleteModal();
    this.toggleModal();
  }

  prepModal(receipt){
    this.setState({
      receiptName: receipt.datum.receiptName,
      receiptAmount: receipt.datum.receiptAmount,
      receiptCategory: receipt.datum.receiptCategory,
      receiptDate: receipt.datum.receiptDate,
      receiptDescription: receipt.datum.receiptDescription,
      index: receipt.datum.id
    })
  }

  render(){
    const LayeredBarChartDatum = toFinalArray(this.props.receipts);
    const receipts = this.props.receipts;
    console.log("receipts: ", receipts)
    const BarChartData = toFinalBarChartArray(LayeredBarChartDatum).map((layer) => (
      <VictoryBar
        name={layer.receiptName}
        data={layer}
        x="receiptCategory"
        y="receiptAmount"
        labelComponent={
          <VictoryLabel
            angle={280}
          />
        }
        events={[{
          target:"data",
          eventHandlers: {
            onMouseEnter: () => {
              return [
                {
                  target: "data",
                  mutation: (props) => {
                    this.receiptStyleHolder(props);
                    return({style: Object.assign({}, props.style, {fill: "red"})})
                  }
                }
              ]
            },
            onMouseLeave: () => {
              return [
                {
                  target: "data",
                  mutation: (props) => {
                    return ({style: Object.assign({}, props.style, {fill: this.state.receiptBarColor})})
                  }
                }
              ]
            },
            onClick: () => {
              return [
                {
                  target: "data",
                  mutation: (props) => {
                    this.prepModal(props);
                    this.toggleModal();
                  }
                }
              ]
            }
          }
        }]}
      />
    ))
    return(
      <div>
        <VictoryChart domainPadding={20}
          containerComponent={
            <VictoryVoronoiContainer
              labels={(d) =>
                "Receipt Name: " + d.receiptName + "\n" + "Receipt Amount: " + d.receiptAmount.toFixed(2)
              }
            />
          }
        >
          <VictoryStack colorScale={"grayscale"}>
            {BarChartData}
          </VictoryStack>
        </VictoryChart>
        <Modal isOpen={this.state.modal} toggle={(e) => this.toggleModal()}>
          <ModalHeader toggle={(e) => this.toggleModal()}><h2>{this.state.receiptName}</h2></ModalHeader>
          <ModalBody>
            <div>
              <h4>Receipt Date</h4>
              <p>{this.state.receiptDate}</p>
            </div>
            <hr />
            <div>
              <h4>Description</h4>
              {receiptDescriptionChecker(this.state.receiptDescription)}
            </div>
            <div>
              <h4>Receipt Amount</h4>
              <p>{numStringConverter(this.state.receiptAmount)}</p>
            </div>
          </ModalBody>
          <ModalFooter>
            <Button color="secondary" onClick={(e) => this.toggleNestedEditModal()}>Edit</Button>
            <Modal isOpen={this.state.nestedEditModal}>
              <ModalHeader toggle={(e) => this.toggleNestedEditModal()}>Edit Receipt!</ModalHeader>
              <ModalBody>
                <Form onSubmit={(e) => this.submitEditedReceipt(e)}>
                  <FormGroup>
                    <div>
                      <Label>Receipt Name</Label>
                    </div>
                    <InputGroup>
                      <Input
                        type="text"
                        name="receiptName"
                        value={this.state.receiptName}
                        onChange={(e) => this.onChange(e)}
                        placeholder="e.g. Icecream Sandwich!"
                      />
                    </InputGroup>
                  </FormGroup>
                  <FormGroup>
                    <div>
                      <Label>Receipt Amount</Label>
                    </div>
                    <InputGroup>
                      <Input
                        type="number"
                        name="receiptAmount"
                        value={this.state.receiptAmount}
                        onChange={(e) => this.onChange(e)}
                        placeholder="e.g. 6.35"
                        />
                      <InputGroupAddon addonType="append">$</InputGroupAddon>
                    </InputGroup>
                  </FormGroup>
                  <FormGroup>
                    <div>
                      <Label>Receipt Category</Label>
                    </div>
                    <InputGroup>
                      <Input
                        type="select"
                        name="receiptCategory"
                        value={this.state.receiptCategory}
                        onChange={(e) => this.onChange(e)}
                      >
                        <option disabled>Select an Option</option>
                        <option>food</option>
                        <option>bill</option>
                        <option>cons</option>
                        <option>misc</option>
                      </Input>
                    </InputGroup>
                  </FormGroup>
                  <FormGroup>
                    <div>
                      <Label>Receipt Date</Label>
                    </div>
                    <InputGroup>
                      <Input
                        type="date"
                        name="receiptDate"
                        value={this.state.receiptDate}
                        onChange={(e) => this.onChange(e)}
                        />
                    </InputGroup>
                  </FormGroup>
                  <FormGroup>
                    <div>
                      <Label>Receipt Description</Label>
                    </div>
                    <InputGroup>
                      <Input
                        type="textarea"
                        name="receiptDescription"
                        value={this.state.receiptDescription}
                        onChange={(e) => this.onChange(e)}
                        placeholder=
                          "e.g. Vanilla icecream sandwich from Salt & Straw in Larchmont"
                      />
                    </InputGroup>
                  </FormGroup>
                  <ModalFooter>
                    <Button color="success" type="submit">Submit!</Button>
                  </ModalFooter>
                </Form>
              </ModalBody>
            </Modal>

            <Button color="danger" onClick={(e) => this.toggleNestedDeleteModal()}>Delete</Button>
            <Modal isOpen={this.state.nestedDeleteModal}>
              <ModalHeader toggle={(e) => this.toggleNestedDeleteModal}>
                Delete!
              </ModalHeader>
              <ModalBody>
                <p>
                  Are you sure you want to delete this receipt?
                </p>
              </ModalBody>
              <ModalFooter>
                <Button color="danger" onClick={(e) => this.handleReceiptDelete(this.state.index)}>Confirm</Button>
              </ModalFooter>
            </Modal>
          </ModalFooter>
      </Modal>
      <BarChartDescriptor />
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  receipts: state.Receipt.listOfReceipts,
  budgetGoal: state.Budget.budgetAmount,
  budgetSelected: state.Budget.selectedBudget,
  userData: state.User.userInfo
})

export default connect(mapStateToProps, {
  editReceipt,
  deleteReceipt
})(ReceiptBarChart);
