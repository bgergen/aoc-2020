package main

import (
	"fmt"
	"io/ioutil"
	"math"
	"sort"
	"strings"
)

func main() {
	input, err := ioutil.ReadFile("../input.txt")
	if err != nil {
		panic(err)
	}
	bps := strings.Split(string(input), "\n")

	fmt.Println(getHighestSeatID(bps))
	fmt.Println(findMissingID(bps))
}

func getNewRange(char rune, min, max int) (int, int) {
	d := int(math.Ceil((float64(max - min)) / 2))
	if char == 'B' || char == 'R' {
		return min + d, max
	}
	return min, max - d
}

func getRowOrCol(seq string, r int) int {
	min := 0
	max := r - 1
	for _, char := range seq {
		min, max = getNewRange(char, min, max)
	}
	return min
}

func calcSeatID(row, col int) int {
	return (row * 8) + col
}

func getSeatID(bp string) int {
	row := getRowOrCol(bp[:7], 128)
	col := getRowOrCol(bp[7:], 8)
	return calcSeatID(row, col)
}

func getHighestSeatID(bps []string) int {
	max := 0
	for _, bp := range bps {
		id := getSeatID(bp)
		if id > max {
			max = id
		}
	}
	return max
}

func findMissingID(bps []string) int {
	ids := make([]int, len(bps))
	for i, bp := range bps {
		ids[i] = getSeatID(bp)
	}

	sort.Ints(ids)
	for i, id := range ids {
		if id != i+ids[0] {
			return id - 1
		}
	}
	return 0
}
