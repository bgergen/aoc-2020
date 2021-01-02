package main

import (
	"fmt"
	"io/ioutil"
	"strings"
)

func main() {
	input, err := ioutil.ReadFile("../input.txt")
	if err != nil {
		panic(err)
	}

	groups := make([][]string, 0)
	for _, resp := range strings.Split(string(input), "\n\n") {
		groups = append(groups, strings.Split(resp, "\n"))
	}

	fmt.Println(getTotal(groups, getNumUnique))
	fmt.Println(getTotal(groups, getNumCommon))
}

func getTotal(groups [][]string, fn func([]string) int) int {
	t := 0
	for _, g := range groups {
		t += fn(g)
	}
	return t
}

func getNumUnique(rows []string) int {
	u := map[rune]bool{}
	for _, r := range rows {
		for _, c := range r {
			u[c] = true
		}
	}
	return len(u)
}

func getNumCommon(rows []string) int {
	u := map[rune]int{}
	for _, r := range rows {
		for _, c := range r {
			if _, found := u[c]; !found {
				u[c] = 1
			} else {
				u[c]++
			}
		}
	}

	t := 0
	for _, v := range u {
		if v == len(rows) {
			t++
		}
	}

	return t
}
