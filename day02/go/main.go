package main

import (
	"fmt"
	"io/ioutil"
	"regexp"
	"strconv"
	"strings"
)

func main() {
	input, err := ioutil.ReadFile("../input.txt")
	if err != nil {
		panic(err)
	}
	rows := strings.Split(string(input), "\n")

	parsedRows := make([][]string, len(rows))
	for i, row := range rows {
		parsed := regexp.MustCompile(`[\-\:\s]`).Split(row, -1)
		parsedRows[i] = append(parsed[:3], parsed[4])
	}

	fmt.Println(findNumValidPasswords(parsedRows, func(r []string) bool {
		min, _ := strconv.Atoi(r[0])
		max, _ := strconv.Atoi(r[1])
		letter := r[2]
		pass := r[3]
		freq := 0
		for _, char := range pass {
			if string(char) == letter {
				freq++
			}
		}
		return freq >= min && freq <= max
	}))

	fmt.Println(findNumValidPasswords(parsedRows, func(r []string) bool {
		i, _ := strconv.Atoi(r[0])
		j, _ := strconv.Atoi(r[1])
		letter := r[2]
		pass := r[3]

		letterFoundOnce := string(pass[i-1]) == letter
		if string(pass[j-1]) == letter {
			letterFoundOnce = !letterFoundOnce
		}
		return letterFoundOnce
	}))
}

func findNumValidPasswords(rows [][]string, fn func([]string) bool) int {
	numValid := 0
	for _, r := range rows {
		if fn(r) {
			numValid++
		}
	}
	return numValid
}
