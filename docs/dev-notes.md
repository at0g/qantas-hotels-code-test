# Developer notes

# General approach

Some tradeoffs have been made for brevity (given this is a code test and will not ship to production):

1. Data loading is primitive, using a simple hook that does not account for error conditions or any intelligent client
 side caching.
2. No logging / error handling
3. No automated testing using a real browser
4. Application state is simply handled locally by the `App` component

# Shortcomings / Gaps

The `PropertyListItem` component is not particularly responsive, as the sample design was only presented in a tablet+
 size.

Some elements of the `PropertyListItem` are dependent on CSS (such as the text overlaying the image). A missing
 stylesheet (or malformed z-index stacking order) could break the user experience in a manner that is not picked up
 by the test suite (moreso a shortcoming of JSDOM).

The `Rating` component is very reliant on presentation. While there are unit tests in place, these are coupled to
 the component implementation and may not catch some errors that might break the user experience (such as cascading 
 styles effecting the display of the svg graphics).

Due to time constraints, the `Rating` component is not very meaningful to a screen reader and could do with some
 additional work to improve accessibility.

# Why not model the `PropertyListItem` props from the shape of the data?

Not all fields of the data are necessary to render the display... coupling the component to the API data shape would
 cause the component to require more data than it actually needs, and potentially make reusing the component (for 
 different data sets) more difficult.
Additionally, some operations (such as `result.property.address.join(',')`) can be easily memoised when mapping the
 data.
