import { StyleSheet } from 'react-native';
import { Colors } from '../../styles/globals';

const styles = StyleSheet.create({
  searchContainer: {
    height: 52,
    backgroundColor: Colors.white,
    flexDirection: 'row',
    margin: 20,
    borderRadius: 10,
  },

  searchInput: {
    flex: 1,
    borderRadius: 10,
    paddingLeft: 16,
  },

  searchButton: {
    height: 52,
    width: 52,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default styles;
