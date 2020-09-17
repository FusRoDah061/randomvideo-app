import React, { useState } from 'react';
import { View, Image, TextInput } from 'react-native';
import { RectButton } from 'react-native-gesture-handler';
import { Colors } from '../../styles/globals';

import searchIcon from '../../assets/icons/search.png';

import styles from './styles';

interface SearchProps {
  onSearch: (term: string) => void;
}

const Search: React.FC<SearchProps> = ({ onSearch }) => {
  const [term, setTerm] = useState('');

  return (
    <View style={styles.searchContainer}>
      <TextInput
        style={styles.searchInput}
        value={term}
        onChangeText={setTerm}
        placeholder="Search channel"
        placeholderTextColor={Colors.text.placeholder}
        returnKeyType="search"
        onSubmitEditing={() => onSearch(term)}
      />

      <RectButton style={styles.searchButton} onPress={() => onSearch(term)}>
        <Image source={searchIcon} />
      </RectButton>
    </View>
  );
};

export default Search;
