import { useState } from 'react';
import Header from './components/Header';
import Result from './components/Result';
import UserInput from './components/UserInput';

function App() {
  const [userInput,setUserInput]=useState(null)
   const [results,setResults]=useState(null);
  const calculateHandler = (userInput) => {
    setUserInput(userInput)
    // Should be triggered when form is submitted
    // You might not directly want to bind it to the submit event on the form though...

    const yearlyData = []; // per-year results

    let currentSavings = userInput['current-savings']; // feel free to change the shape of this input object!
    const yearlyContribution = userInput['yearly-contribution']; // as mentioned: feel free to change the shape...
    const expectedReturn = userInput['expected-return'] / 100;
    const duration = userInput['duration'];

    // The below code calculates yearly results (total savings, interest etc)
    for (let i = 0; i < duration; i++) {
      const yearlyInterest = currentSavings * expectedReturn;
      currentSavings += yearlyInterest + yearlyContribution;
      yearlyData.push({
        // feel free to change the shape of the data pushed to the array!
        year: i + 1,
        yearlyInterest: yearlyInterest,
        savingsEndOfYear: currentSavings,
        yearlyContribution: yearlyContribution,
      });
    }
    setResults(yearlyData);


    // do something with yearlyData ...
  };

  return (
    <div>
    <Header/>
    <UserInput onCalculate={calculateHandler}/>
    {!results && <p>No investments Calculated</p>}
    {results && <Result data={results} initial={userInput['current-savings']}/>}

      {/* Todo: Show below table conditionally (only once result data is available) */}
      {/* Show fallback text if no data is available */}

      
    </div>
  );
}

export default App;
