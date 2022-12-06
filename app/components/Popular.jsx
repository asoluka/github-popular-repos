import React, { Component } from "react";
import PropTypes from "prop-types";
import { fetchPopularRepos } from "../utils/api";
import Table from "./Table";

function LanguageNav({ selected, onUpdateLanguage }) {
  const languages = ["All", "JavaScript", "Ruby", "Java", "CSS", "Python"];
  return (
    <select
      onChange={(e) => {
        onUpdateLanguage(e.target.value);
      }}
      selected={selected}
    >
      {languages.map((language) => (
        <option key={language} value={language}>
          {language}
        </option>
      ))}
    </select>
  );
}

LanguageNav.propTypes = {
  selected: PropTypes.string.isRequired,
  onUpdateLanguage: PropTypes.func.isRequired,
};

export class Popular extends Component {
  state = {
    selectedLanguage: "All",
    repos: null,
    error: null,
  };

  componentDidMount = () => {
    this.updateLanguage(this.state.selectedLanguage);
  };

  updateLanguage(selectedLanguage) {
    this.setState({
      ...this.state,
      selectedLanguage,
      error: null,
    });

    fetchPopularRepos(selectedLanguage)
      .then((repos) =>
        this.setState({
          repos,
          error: null,
        })
      )
      .catch((error) => {
        console.warn("Error fetching repos", error);
        this.setState({
          ...this.state,
          error: `There was an error fetching the repositories`,
        });
      });
  }

  render() {
    const { selectedLanguage, repos, error } = this.state;
    return (
      <main className="stack main-stack animate-in">
        <div className="split">
          <h1>Popular</h1>
          <LanguageNav
            onUpdateLanguage={this.updateLanguage}
            selected={selectedLanguage}
          />
        </div>

        {error && <p className="text-center error">{error}</p>}

        {repos && <Table repos={repos} />}
      </main>
    );
  }
}

export default Popular;
