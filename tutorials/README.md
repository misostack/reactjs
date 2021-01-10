## Headfirst

### Single Components

1. JSX
2. Rendering Lists
3. Conditional Rendering
4. Handling events
5. Updating the State

### Composing Components

1. Pass Data
2. Raise and Handle Events
3. Multiple Components in Sync
4. Functional Components
5. Lifecycle Hooks

> Some kind of components:

- Controlled Component : doesn't have state, completely received data by props and raise the events

> Lifting up the state

> Stateless Funtional Components

> Destructuring Arguments

> Life Cycle Hooks

> There is few special methods, you can add to a react component and react will automatically call these methods and we refer to these methods as lifecycle hooks

- **Mount phase** : an instance of a component is created an inserted into the DOM
  In this phase, we have : constructor -> render -> componentDidMount

- **Update phase** : whenever a state or a prop get changed ,these below method will call in order
  In this phase, we have 2 lifecycle hooks : render --> componentDidUpdate

- **UnMount Phase** :
  In this phase, we have : componentWillUnmount