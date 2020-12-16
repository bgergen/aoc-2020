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
	treeMap := strings.Split(string(input), "\n")

	fmt.Println(countTrees(treeMap, [2]int{3, 1}))
	fmt.Println(getTreeProduct(treeMap, [][2]int{{1, 1}, {3, 1}, {5, 1}, {7, 1}, {1, 2}}))
}

func countTrees(rows []string, slope [2]int) int {
	x := slope[0]
	y := slope[1]
	c := 0
	for i, row := range rows {
		if i%y != 0 {
			continue
		}
		pos := (i * x / y) % len(row)
		if row[pos] == '#' {
			c++
		}
	}
	return c
}

func getTreeProduct(rows []string, slopes [][2]int) int {
	prod := 1
	for _, s := range slopes {
		prod *= countTrees(rows, s)
	}
	return prod
}
