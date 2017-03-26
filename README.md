## Live Site

http://www.template-translator.co/

## How to build

```bash
$ git clone https://github.com/daniellizik/template-translator
$ cd template-translator
$ npm i
$ npm run dev
# will be running at localhost:8080
```

## Why
Was at a job once and saw that our designers were having a hell of a time translating static email templates into a dozen languages. Clients would also come back with miniscule changes and the designers would have to poke through hundreds of lines of html tables (yes...tables) to change strings.

I was thinking of introducing a gulp/jade build but even the simplest of command line tasks seemed out of reach for our designers who were, at the time, swamped with work and didn't have any extra time to learning dev stuff.

Why should they though? Why should a designer have to learn code in order to automate mundane work? So maybe an electron app that runs the build under the hood would work, but then I thought, why not take the static html template, turn into an AST, then flatten the tree, and then query the list as if it were a nosql document?

So this app (tries to) solve that problem by letting the user upload an html file. They can then compose clauses to search for certain html elements and modify many at a time. You can even modify html element attributes.

## Use case examples

- You have fifty links in an email and need to change some affiliate redirect query parameters on all of them.
- You need to change all instances of the word "gato" with "chat", but **only** if they are inside a `<span>` with a certain class.
- You need to translate one base email template into 50 different languages, and you want to supply a csv or json file with all the strings.

## Roadmap

Oh god this isn't anywhere near being done. I wonder if, instead of recreating all the querying logic by hand, I could just use nedb or something...

https://trello.com/b/rthWKxZk/template-translator