import { useState } from "react";
import styled from "styled-components";

const Container=styled.div`
  display:flex;
  width: 100%;
  flex-direction :column;
  align-items: center;
  margin:10px;
  font-family:Montserrat;
`;
const BalanceBox=styled.div`
        font-size:15px;
        width:100%;
        display: flex;
        flex-direction: row;
        justify-content:space-between;
        align-items:center;
`;
const AddTransaction=styled.div`
       background: green;
       color:white;
       padding:5px 10px;
       border-radius:4px;
       text-align: center;
       cursor:pointer;
       font-weight:bold;
       font-size:15px;
`;
const AddTransactionContainer=styled.div`
    display: flex;

    flex-direction: column;
    border: 1px solid black;
    gap: 10px;
    width:100%;
    padding: 15px 20px;
    margin: 20px;
    & input{
        outline: none;
        padding: 10px 12px;
        border-radius: 4px;
        border: 1px solid black;
        
    }
`;
const RadioBox=styled.div`
dispaly: flex;
flex-direction: row;
width: 100%;
align-items:center;
& input {
    width: unset;
    margin: 0 10px;
}

`;
const ExpenseContainer=styled.div`
        display:flex;
        flex-direction: row;
        gap:12px;
        margin:20px;
`;
const ExpenseBox=styled.div`
        display:flex;
        flex-direction: column;
        border-radius:4px;
        border:1px solid black;
        padding:15px 20px;
        width:135px;
        font-size:14px;

        & span{
            font-weight:bold;
            font-size:20px;
            color:${(props)=>(props.isIncome ? "green":"orange")};
        }
        
`;
const AddTransactionView=(props)=>{
    const [amount,setAmount]=useState();
    const [describe,setDsc]=useState();
    const [type,setType]=useState("EXPENSE");
    const addTransaction=()=>{
    props.addTransaction({amount:Number(amount),describe,type,id:Date.now()})
    console.log({amount,describe,type});
    props.toggleAddTrans()
    
};

    return(
        <AddTransactionContainer>
            <input placeholder="Amount" 
            value={amount}
            type="number"
             onChange={(e)=>setAmount(e.target.value)}/>
            <input placeholder="Description" value={describe} onChange={(e)=>setDsc(e.target.value)}/>
             <RadioBox>
                <input type="radio"
                 id="expense" 
                 name="type" 
                 value="EXPENSE" 
                 checked={type=="EXPENSE"}
                 onChange={(e)=>setType(e.target.value)}/>
               <label htmlFor="expense">Expense</label>
               <input type="radio"
                id="income"
                 name="type" 
                 value="INCOME"
                  checked={type=="INCOME"}
                   onChange={(e)=>setType(e.target.value)}/>
               <label htmlFor="income">Income</label>
             </RadioBox>
             <AddTransaction onClick={addTransaction}>Add Transaction</AddTransaction>
        </AddTransactionContainer>
    );
};

const OverviewComponent=(props)=>{
        const[isAddTransVisible,toggleAddTrans]=useState(false);
    return(
        <Container>
            <BalanceBox>
                Balance:${props.income-props.expense}
                <AddTransaction onClick={()=>toggleAddTrans(!isAddTransVisible)}>{isAddTransVisible ? "Cancel": "ADD" }</AddTransaction>

                </BalanceBox>
                {isAddTransVisible && <AddTransactionView 
                toggleAddTrans={toggleAddTrans} 
                addTransaction={props.addTransaction}/>}
                <ExpenseContainer> 
            <ExpenseBox isIncome={false}>
                Expense<span>
                    ${props.expense}
                </span>
            </ExpenseBox>
            <ExpenseBox isIncome={true}>
                Income<span>
                    ${props.income}
                </span>
            </ExpenseBox>
        </ExpenseContainer>
            </Container>
    )
};
export default OverviewComponent
