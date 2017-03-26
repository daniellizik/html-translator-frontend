use this for mass editor and query builder

a "clause" is basically a form field. the user can add forms or remove them, each clause being an object in state[stateKey].clauses. Each clause object has the same properties

```
 {
   target: <string>,
   targetValue: <string>
   rule: <string>
   ruleValue: <string>
   flags: <string>
   input: <string>
 }
```

Depending on the properties in each clause, different clause subcomponents must be rendered. For instance, if you want to search the view for attribute keys by regex you will need two inputs (one for regex body, one for flags), one select for target, one select for rule. The logic that determines which clause subcomponents are needed is the `clausePolicy`.