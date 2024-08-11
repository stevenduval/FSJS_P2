/*
Create the `showPage` function
This function will create and insert/append the elements needed to display a "page" of nine students
*/

const showPage = (list, page) => {
   // set start index
   let start = (page * 9) - 9;
   // set end index
   let end = page * 9;
   // select student list element and clear its inner html
   let studentList = document.querySelector('.student-list');
   studentList.innerHTML = '';
   // filter through list to only return the students we need
   list = list.filter((student, i) => i >= start && i < end);
   // create document fragment to store all student li elements into
   let documentFrag = document.createDocumentFragment();
   // for each student we need to display
   list.forEach(student  => { 
      // create li, set class of li, set inner html of li to student info, append li to document frag
      let li = document.createElement('li');
      li.className = 'student-item cf';
      li.innerHTML = `
         <div class="student-details">
            <img class="avatar" src="${student.picture.medium}" alt="Profile Picture">
            <h3>${student.name.first} ${student.name.last}</h3>
            <span class="email">${student.email}</span>
         </div>
         <div class="joined-details">
            <span class="date">${student.registered.date}</span>
         </div>
      `;
      documentFrag.appendChild(li);
   });
   // append all document fragment containing all li elements to student list
   studentList.appendChild(documentFrag);
};

/*
Create the `addPagination` function
This function will create and insert/append the elements needed for the pagination buttons
*/

const addPagination = (list) => {
   // set number of pages allowed
   let pages = list.length / 9;
   // select list element that stores pagination buttons and clear the inner html
   let linkList = document.querySelector('.link-list');
   linkList.innerHTML = '';
   // create document fragment to allow creation of li elements so they can all be added at once
   let documentFrag = document.createDocumentFragment();
   // loop up until max page length
   for (let i = 0; i < pages; i++) {
      // create li and button elements
      let li = document.createElement('li'); 
      let button = document.createElement('button');
      // set attributes of the button
      button.type = 'button';
      button.className = (i === 0) ? 'active': '';
      button.textContent = i + 1;
      // append button to li and li to document fragment
      li.appendChild(button)
      documentFrag.appendChild(li);
   }
   // set content of pagination area equal to the documentFrag content
   linkList.appendChild(documentFrag);
   // add event listener to parent of pagination buttons and use event bubbling to listen for clicked buttons
   linkList.addEventListener('click', ( { target : elemClicked } )=> {
      if (elemClicked.tagName === 'BUTTON') {
         // remove and set active class on button that was clicked
         document.querySelector('button.active').classList.remove("active");
         elemClicked.classList.add('active');
         // send student list and clicked button text content (i.e. page number) to show page function
         showPage(list, elemClicked.textContent);
      }
   });
};

// function to filter data typed into search bar
// destructure event.target.value parameter to a parameter called inputVal
const filterData = ( {target: {value : inputVal} } ) => {
   // filter student data to only return students whose name includes value from search bar
   let searchResults = data.filter(student => {
      let studentName = `${student.name.first.toLowerCase()} ${student.name.last.toLowerCase()}`;
      return studentName.includes(inputVal.toLowerCase())
   });
   // if no results returned, set no results text, clear pagination buttons and break out of function
   if (searchResults.length === 0) { 
      document.querySelector('.student-list').innerHTML = '<li>No Results</li>'; 
      document.querySelector('.link-list').innerHTML = '';
      return false;
   }
   // otherwise show results and add pagination buttons
   showPage(searchResults, 1);
   addPagination(searchResults);
};

// function to add search bar to page
const addSearch = () => {
   // select header and set content
   let header = document.querySelector('header');
   let content = `
         <label for="search" class="student-search">
         <span>Search by name</span>
         <input id="search" placeholder="Search by name...">
         <button type="button"><img src="img/icn-search.svg" alt="Search icon"></button>
         </label>
   `;
   header.insertAdjacentHTML("beforeend", content);
   // add event listener to search input so we can grab typed value
   document.querySelector('#search').addEventListener('keyup', filterData);
};

// Call functions
addSearch();
showPage(data, 1);
addPagination(data);