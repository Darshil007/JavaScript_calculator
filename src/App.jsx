import { useState } from 'react'
import './App.css'

function App() {
  const [answer, setAnswer] = useState("");
  const [expression, setExpression] = useState("");
  const et = expression.trim();

  const isOperator = (symbol) => {
    return /[*/+-]/.test(symbol);
  };

  const display = (symbol) => {
    if (symbol === "clear") {
      setAnswer("");
      setExpression("0");
    } else if (symbol === "negative") {
      if (answer === "") return;
      setAnswer(
        answer.toString().charAt(0) === "-" ? answer.slice(1) : "-" + answer
      );
    }else if (isOperator(symbol)) {
      setExpression(et + " " + symbol + " ");
    } else if (symbol === "=") {
      calculate();
    } else if (symbol === "0") {
      if (expression.charAt(0) !== "0") {
        setExpression(expression + symbol);
      }
    } else if (symbol === ".") {
      // split by operators and get last number
      const lastNumber = expression.split(/[-+/*]/g).pop();
      if (!lastNumber) return;
      if (lastNumber?.includes(".")) return;
      setExpression(expression + symbol);
    } else {
      if (expression.charAt(0) === "0") {
        setExpression(expression.slice(1) + symbol);
      } else {
        setExpression(expression + symbol);
      }
    }
  };

  const calculate = () => {
    // if last char is an operator, do nothing
    if (isOperator(et.charAt(et.length - 1))) return;
    // clean the expression so that two operators in a row uses the last operator
    // 5 * - + 5 = 10
    const parts = et.split(" ");
    const newParts = [];

    // go through parts backwards
    for (let i = parts.length - 1; i >= 0; i--) {
      if (["*", "/", "+"].includes(parts[i]) && isOperator(parts[i - 1])) {
        newParts.unshift(parts[i]);
        let j = 0;
        let k = i - 1;
        while (isOperator(parts[k])) {
          k--;
          j++;
        }
        i -= j;
      } else {
        newParts.unshift(parts[i]);
      }
    }
    const newExpression = newParts.join(" ");
    if (isOperator(newExpression.charAt(0))) {
      setAnswer(eval(answer + newExpression).toString());
    } else {
      setAnswer(eval(newExpression).toString());
    }
    setExpression("");
  };
  return (
    <>
       <div className='h-[100vh] flex justify-center items-center font-digital text-[18px]'>
           <div id='calculator' className='container flex flex-col justify-center items-center'>
             <div id='display' className='w-[100%] flex flex-col justify-center items-center'>
                <div className='w-[22%] text-end bg-[black] p-1 text-[15px]'>{answer}</div>
                <div className='w-[22%] text-end bg-[black] p-1 text-[25px]'>{expression}</div>
             </div>
            <div className='w-[22%] h-[70%] number-pad grid grid-cols-4 gap-1 bg-[#0f172a] p-1'>
              <button onClick={() =>display("clear")} id='clear' className='col-span-2 bg-[#AC3939] text-[white] h-[60px]'>AC</button>
              <button onClick={() =>display("/")} id='divide' className='bg-[#666666] text-[white] h-[60px]'>/</button>
              <button onClick={() =>display("*")} id='multiply' className='bg-[#666666] text-[white] h-[60px]'>*</button>
              <button onClick={() =>display("7")} id='seven' className=' bg-[#4D4D4D] text-[white] h-[60px]'>7</button>
              <button onClick={() =>display("8")} id='eight' className=' bg-[#4D4D4D] text-[white] h-[60px]'>8</button>
              <button onClick={() =>display("9")} id='nine' className=' bg-[#4D4D4D] text-[white] h-[60px]'>9</button>
              <button onClick={() =>display("-")} id='subtract' className='bg-[#666666] text-[white] h-[60px]'>-</button>
              <button onClick={() =>display("4")} id='four' className=' bg-[#4D4D4D] text-[white] h-[60px]'>4</button>
              <button onClick={() =>display("5")} id='five' className=' bg-[#4D4D4D] text-[white] h-[60px]'>5</button>
              <button onClick={() =>display("6")} id='six' className=' bg-[#4D4D4D] text-[white] h-[60px]'>6</button>
              <button onClick={() =>display("+")} id='add' className='bg-[#666666] text-[white] h-[60px]'>+</button>
              <button onClick={() => display("1")} id='one' className=' bg-[#4D4D4D] text-[white] h-[60px]'>1</button>
              <button onClick={() => display("2")} id='two' className=' bg-[#4D4D4D] text-[white] h-[60px]'>2</button>
              <button onClick={() => display("3")} id='three' className=' bg-[#4D4D4D] text-[white] h-[60px]'>3</button>
              <button onClick={() => display("=")} id='equals' className='row-span-2 bg-[#004466] text-[white]'>=</button>
              <button onClick={() => display("0")} id='zero' className='col-span-2 bg-[#4D4D4D] text-[white] h-[60px]'>0</button>
              <button onClick={() =>display(".")} id='decimal' className=' bg-[#4D4D4D] text-[white] h-[60px]'>.</button>

            </div>
           </div>
       </div>
    </>
  )
}

export default App
