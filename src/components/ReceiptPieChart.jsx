import React, { Component } from "react";
import {VictoryPie, VictoryContainer, VictoryLabel} from "victory";
import { connect } from "react-redux";
import {
  fetchReceipts,
  createReceipt,
} from "../actions/ReceiptActions";
import {
  Button,
  Jumbotron,
  Form,
  FormGroup,
  Label,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  InputGroup,
  InputGroupAddon,
  Row,
  Col,
  Input
} from "reactstrap";
import receiptFormatter from "./utils/ReceiptFormatter";
import CategoryConverter from "./utils/FinalPieChartData";
import sortReceiptCategory from "./utils/SortReceiptCategory";
import PieChartDescriptor from "./PieChartDescriptor";


class ReceiptPieChart extends Component {
  constructor(){
    super();
    this.state = {
      receiptName: "",
      receiptAmount: "",
      receiptCategory: "",
      receiptDate: "",
      receiptDescription: "",
      modal: false
    };
  }
  resetForm(){
    this.setState({
      receiptName: "",
      receiptAmount: "",
      receiptCategory: "",
      receiptDate: "",
      receiptDescription: "",
    })
  }

  onChange(e){
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  onSubmit(e){
    const newReceipt = {
      receiptAmount: this.state.receiptAmount,
      receiptCategory: this.state.receiptCategory,
      receiptDate: this.state.receiptDate,
      receiptDescription: this.state.receiptDescription,
      receiptName: this.state.receiptName
    };
    this.props.createReceipt(newReceipt, this.props.userData.id, this.props.budgetSelected)
    e.preventDefault();
    this.resetForm();
    this.toggleModal();
  }


  toggleModal(){
    this.setState({
      modal: !this.state.modal
    });
  }


  render(){
    const formattedReceipts = receiptFormatter(this.props.receipts);
    const categoricalData = sortReceiptCategory(formattedReceipts);
    const totalExpenditures = (categoricalData.reduce((x,y) => ({total: x.total + y.total}))).total
    const remainingBudget = this.props.budgetGoal - totalExpenditures
    const dataForChart = categoricalData.concat([{receiptCategory: "Remaining Budget", total: remainingBudget}])
    const finalPieChartData = CategoryConverter(dataForChart);
    return(
      <div>
        <Modal isOpen={this.state.modal} toggle={(e) => this.toggleModal()}>
          <ModalHeader toggle={(e) => this.toggleModal()}>Receipt</ModalHeader>
          <ModalBody>
            <Form onSubmit={(e) => this.onSubmit(e)}>
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

        <Jumbotron>
          <VictoryContainer width={450} height={450}>
            <circle cx={225} cy={225} r={50} fill="#55add7" onClick={(e) => this.toggleModal()} />
            <p>Test</p>
            <VictoryPie
              padAngle={3}
              standalone={false}
              width={450}
              height={450}
              innerRadius={100}
              labelRadius={125}
              colorScale={["#f5f5f5", "#cad4ba", "#daf2ed", "#d0f5cc", "#daafde"]}
              data={finalPieChartData}
              x="receiptCategory"
              y="total"
              labelComponent={
                <VictoryLabel
                  dx={0}
                  dy={0}
                />
              }
              events={[{
                target: "data",
                eventHandlers: {
                  onClick: () => {
                    return [
                      {
                        target: "data",
                        mutation: (props) => {
                          const fill = props.style && props.style.fill;
                          return fill === "#c43a31" ? null : {style: {fill: "#c43a31"}};
                        }
                      },
                      {
                        target: "labels",
                        mutation: (props) => {
                          let total = (props.datum._y).toFixed(2);
                          let amountRemaining = "Total: " + total + "$"
                          let finalLabel =  amountRemaining
                          return props.text === finalLabel ? null : {text: finalLabel};
                        }
                      }
                    ]
                  },
                  onContextMenu: (e) => {
                    e.preventDefault();
                    return [
                      {
                        target: "data",
                        mutation: (props) => {
                          let receiptCategory = props.datum.receiptCategory.toLowerCase();
                          const categories = ["misc", "food", "bill", "cons"];
                          for (var i = 0; i < categories.length; i ++){
                            if (receiptCategory.includes(categories[i])){
                              this.setState({
                                receiptCategory: categories[i]
                              })
                            }
                          }
                          this.toggleModal();
                        }
                      }
                    ]
                  }
                }
              }]}
            />
          </VictoryContainer>
        </Jumbotron>

        <PieChartDescriptor />
      </div>
    )
  }
}

const mapStateToProps = state => ({
  receipts: state.Receipt.listOfReceipts,
  budgetGoal: state.Budget.budgetAmount,
  budgetSelected: state.Budget.selectedBudget,
  userData: state.User.userInfo
})

export default connect(mapStateToProps, {
  createReceipt,
})(ReceiptPieChart);
