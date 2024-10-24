import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListSubheader from '@material-ui/core/ListSubheader';

const styles = theme => ({
	root: {
		width: '100%',
		// maxWidth: 360,
		backgroundColor: theme.palette.background.paper,

		overflow: 'auto',
		maxHeight: 300
		// textAlign: 'center'
	},
	listSection: {
		backgroundColor: 'inherit'
	},
	ul: {
		backgroundColor: 'inherit',
		padding: 0
	}
});

function PinnedSubheaderList(props) {
	const { classes } = props;

	return (
		<List className={classes.root} subheader={<li />}>
			{[0, 1, 2, 3, 4].map(sectionId => (
				<li key={`section-${sectionId}`} className={classes.listSection}>
					<ul className={classes.ul}>
						<ListSubheader>{`Egreso ${sectionId + 1}`}</ListSubheader>
						{[0, 1, 2].map(item => (
							<ListItem key={`egreso-${sectionId}-${item}`}>
								<ListItemText primary={`egreso ${item}`} />
							</ListItem>
						))}
					</ul>
				</li>
			))}
		</List>
	);
}

PinnedSubheaderList.propTypes = {
	classes: PropTypes.object.isRequired
};

export default withStyles(styles)(PinnedSubheaderList);
