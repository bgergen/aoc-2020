package main

import (
	"errors"
	"fmt"
	"io/ioutil"
	"strconv"
	"strings"
)

const total = 2020

func main() {
	input, err := ioutil.ReadFile("../input.txt")
	if err != nil {
		panic(err)
	}
	rows := strings.Split(string(input), "\n")

	entries := make([]int, len(rows))
	for i, r := range rows {
		e, err := strconv.Atoi(r)
		if err != nil {
			panic(err)
		}
		entries[i] = e
	}

	part1, err := getProduct(entries, total, 2)
	if err != nil {
		panic(err)
	}
	fmt.Println(part1)

	part2, err := getProduct(entries, total, 3)
	if err != nil {
		panic(err)
	}
	fmt.Println(part2)
}

func getProduct(entries []int, sum, numToSum int) (int, error) {
	if numToSum == 1 {
		for _, e := range entries {
			if e == sum {
				return sum, nil
			}
		}
		return 0, errors.New("No match found")
	}

	for i, e := range entries {
		comp := sum - e
		product, err := getProduct(entries[i:], comp, numToSum-1)
		if err != nil {
			continue
		}
		return e * product, nil
	}

	return 0, errors.New("No valid product found")
}
