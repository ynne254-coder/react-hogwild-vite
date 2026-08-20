# Hogwild: The React app for fans of prize-winning pigs

Imagine you are tasked with creating an interface for a pig farming competition for your local county fair that will show details about all the pigs who have entered the county fair competition along with their details that will be provided for you in a file. Your app must allow users to filter, sort, and update the displayed hogs while maintaining accessibility and responsiveness.
To complete this lab, you’ll need to apply your knowledge of component-based design, props, state management, event handling, and conditional rendering.


## Instructions
- To run the lab:
```bash
npm install
npm run dev
```
- To run the test suite:
```bash
npm run test
```
- Use the test suite and deliverables below to complete this lab. Be sure not just to 
pass the tests, but check the desired functionality is working in browser

## Deliverables

- _When the app first loads_, display a tile for each hog in the
  `porker_data.js` file. In the tile, display the **name** and **image** for
  each hog. The name should be in an h3 tag.
- _When the user clicks on the hog tile_, display the other details about the
  hog (its **specialty**, **weight**, **greased**, and **highest medal
  achieved**)
- Allow the user to _filter_ the hogs that are **greased**
  - *hint:* The test is expecting a checkbox with an associated label. For this you will
   need to use the htmlFor property.
- Allow the user to _sort_ the hogs based on **name** or **weight**

- Create a button with "Hide Me" as the text for each hog card to allow users to _hide_ 
hogs (not delete them, just hide them from view!)
- Add a form to allow users to _add_ new hogs to the page
  - *hint:* The form test also looks for labels, so you'll need htmlFor again.
- Implement [Semantic Cards](https://semantic-ui.com/views/card.html) for
  each hog. Each hog card wrapping element (such as a div) will need to be given 
  an aria-label of "hog card" to be recognized by the test suite. Example below:
  ```javascript
    <div aria-label="hog card" className="semantic ui classes go here">
      // Hog Card elements here
    </div>
  ```

## Project Guidelines

- Follow
  [React best practices](https://reactjs.org/docs/thinking-in-react.html) to
  create components and decide on where state needs to live
- Pass props down from parent components to children
- Use inverse data flow and callback functions to pass data up from child
  components to parents
- Re-render components by setting state

## What we have so far

- A file containing all our hog data (`./src/porkers_data.js`) imported into `App.jsx`
- A `<Nav>` component rendered in our `App.jsx`

## Trying to figure out where to start?

Start by wireframing what you want the app to look like and breaking it up into 
components.

Once you've decided on your components, use the MVP (minimum viable product)
approach. What's the simplest thing we can render to the page? Perhaps a
paragraph tag displaying each hog's name? Which components would this involve?

When building your filter and sort functionalities, consider what you want to
store in state and where that state should be stored. How can a child component
pass information up to its parent component? Think about what needs to happen
upon each index rerender. What if a user filters out un-greased pigs, and then
wants the remaining pigs sorted by weight?

The test suites will look for specific wording in labels or naming of html element
attributes. You can take a peek in the test files in you're unsure why the test is 
not passing but your code looks right in browser. It could be you have an extra space, 
capitalization is different, or are missing some punctuation.

Be sure to use good programming practices, such as clear variable names and
single responsibility functions. React apps can quickly become tangled and hard
to debug if built without best practices!

## Styling

We've imported the Semantic CSS library to keep your piggies looking pretty. To
keep your hogs in columns, make sure their parent container has the class
`"ui grid container"`. The children in the columns should have class
`"ui eight wide column"`. (Semantic uses a grid with a default of 16 units wide,
so 8-wide will make two columns and 4-wide will make 4 columns.)

Semantic will take care of assigning the columns for you. You can also try
implementing [Semantic Cards](https://semantic-ui.com/views/card.html) for each
hog.


## Completed Implementation

The dashboard is implemented in `src/components/App.jsx` with reusable navigation, hog-card, and add-hog form components. It supports expandable hog details, greased-only filtering, name and weight sorting, hiding cards, adding new hogs, accessible labels, and Semantic UI cards. The UI is responsive and includes an empty-state message when filters hide every hog.

Run the full verification with:

```bash
npm install
npm test -- --run
npm run build
```

The repository's automated test suite covers initial rendering, detail expansion, filtering, sorting, hiding, adding a hog, and Semantic UI card structure.

## GitHub Pages

The Vite base path is configured for `/react-hogwild-vite/`, so the app can be served from the repository's GitHub Pages project path after a production build.
