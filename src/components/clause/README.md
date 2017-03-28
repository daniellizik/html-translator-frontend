## clause

`clause` is an array that contains objects of `type` `query` or `mutator`.

```
// clause object signature
{
  target: <string>,
  targetValue: <string>
  rule: <string>
  ruleValue: <string>
  ruleValueFlags: <string>
  type: <string[query|mutator]>
}
```



Depending on the properties in each clause, different clause subcomponents must be rendered. For instance, if you want to search the view for attribute keys by regex you will need two inputs (one for regex body, one for flags), one select for target, one select for rule. The logic that determines which clause subcomponents are needed is the `clausePolicy`.

each `clause` can have any number of `query` and `mutator` objects. These are specified by `type` and instruct the reducer to either find nodes in the list or to mutate the current view. Mutators in separate clauses run independently and the user should be able to navigate between different clauses to see the independent outcome of each.