const container = document.getElementById('checkbox-group');
      const submitBtn = document.getElementById('submit-btn');      
      
      function createCheckbox(id, label) {
        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.className = 'btn-check';
        checkbox.name = 'check';
        checkbox.id = id;
        checkbox.value = id;
        checkbox.autocomplete = 'off';

        const checkboxLabel = document.createElement('label');
        checkboxLabel.className = 'btn btn-outline-secondary';
        checkboxLabel.htmlFor = id;
        checkboxLabel.textContent = label;

        container.appendChild(checkbox);
        container.appendChild(checkboxLabel);

        return container;
      }

      function formatName(symptom) {
        return symptom.split('_').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
      }

      Papa.parse("../static/Testing.csv", {
        header: true,
        download: true,
        complete: function(results) {
          const headers = Object.keys(results.data[0]);
          headers.forEach(element => {
            
            const checkboxContainer = createCheckbox(element, formatName(element));
            document.body.appendChild(checkboxContainer);
          });
        }
      });

      const output ={};

      submitBtn.addEventListener('click', (event) => {
    event.preventDefault();
    console.log('Submit button clicked');
    
    const check_value=document.getElementsByTagName('input');
    
    for(let ele of check_value) {
        if (ele.type === 'checkbox' && ele.checked) {
            output[ele.value] = 1;
        }
        else {
            output[ele.value] = 0;
        }
    }
    
    console.log(JSON.stringify(output)); 
    
    // Send checkbox values to backend using AJAX
    const xhr = new XMLHttpRequest();
    xhr.open('POST', '/submit-checkbox-values', true);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.onreadystatechange = function() {
        if (xhr.readyState === XMLHttpRequest.DONE && xhr.status === 200) {
            const response = JSON.parse(xhr.responseText);
            console.log('response ',response);
            const pred = response.message;
            document.getElementById('output').innerHTML = pred;
        }
    }
    xhr.send(JSON.stringify(output));
});
